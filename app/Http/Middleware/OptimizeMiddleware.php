<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class OptimizeMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        if (!hIsEnv('localssss')) {
            $buffer = $response->getContent();

            if (strpos($buffer, '<pre>') !== false) {
                $replace = array(
                    '/<!--[^\[](.*?)[^\]]-->/s' => '',
                    "/<\?php/"                  => '<?php ',
                    "/\r/"                      => '',
                    "/>\n</"                    => '><',
                    "/>\s+\n</"                 => '><',
                    "/>\n\s+</"                 => '><',
                );
            } else {
                $replace = array(
                    '/<!--[^\[](.*?)[^\]]-->/s' => '',
                    "/<\?php/"                  => '<?php ',
                    "/\n([\S])/"                => '$1',
                    "/\r/"                      => '',
                    "/\n/"                      => '',
                    "/\t/"                      => '',
                    "/ +/"                      => ' ',
                );
            }

            $buffer = preg_replace(array_keys($replace), array_values($replace), $buffer);
            $response->setContent($buffer);

            // If you like to enable GZip, too!
            ini_set('zlib.output_compression', 'On');
        }

        return $response;
    }
}
