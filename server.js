const NextServer = require("next/dist/server/next-server").default;
const http = require("http");
const path = require("path");
process.env.NODE_ENV = "production";
process.chdir(__dirname);

// Make sure commands gracefully respect termination signals (e.g. from Docker)
// Allow the graceful termination to be manually configurable
if (!process.env.NEXT_MANUAL_SIG_HANDLE) {
  process.on("SIGTERM", () => process.exit(0));
  process.on("SIGINT", () => process.exit(0));
}

let handler;

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL("http://localhost:3000" + req.url);
    const params = new URLSearchParams(url.search);
    const queryParams = {};

    for (const [key, value] of params.entries()) {
      queryParams[key] = value;
    }

    console.log("next server handling request", JSON.stringify(req.url));
    console.log("next server received headers", JSON.stringify(req.headers));
    console.log("next server received query params", JSON.stringify(queryParams));

    // res.writeHead(200, { "Content-Type": "application/json" });
    // res.write(
    //   JSON.stringify({
    //     queryParams: queryParams,
    //     path: url.pathname,
    //     headers: req.headers,
    //   })
    // );
    
    // res.end();

    await handler(req, res);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end("internal server error");
  }
});
const currentPort = parseInt(process.env.PORT, 10) || 3000;
const hostname = process.env.HOSTNAME || "localhost";

server.listen(currentPort, (err) => {
  if (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
  const nextServer = new NextServer({
    hostname,
    port: currentPort,
    dir: path.join(__dirname),
    dev: false,
    customServer: false,
    conf: {
      env: {},
      webpack: null,
      webpackDevMiddleware: null,
      eslint: { ignoreDuringBuilds: false },
      typescript: { ignoreBuildErrors: false, tsconfigPath: "tsconfig.json" },
      distDir: "./.next",
      cleanDistDir: true,
      assetPrefix: "",
      configOrigin: "next.config.js",
      useFileSystemPublicRoutes: true,
      generateEtags: true,
      pageExtensions: ["tsx", "ts", "jsx", "js"],
      target: "server",
      poweredByHeader: true,
      compress: true,
      analyticsId: "",
      images: {
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        path: "/_next/image",
        loader: "default",
        loaderFile: "",
        domains: [],
        disableStaticImages: false,
        minimumCacheTTL: 60,
        formats: ["image/webp"],
        dangerouslyAllowSVG: false,
        contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;",
        remotePatterns: [
          {
            protocol: "https",
            hostname: "images.unsplash.com",
            port: "",
            pathname: "**",
          },
          {
            protocol: "https",
            hostname:
              "fdingler-image-classification.s3.us-west-2.amazonaws.com",
            port: "",
            pathname: "**",
          },
        ],
        unoptimized: false,
      },
      devIndicators: {
        buildActivity: true,
        buildActivityPosition: "bottom-right",
      },
      onDemandEntries: { maxInactiveAge: 15000, pagesBufferLength: 2 },
      amp: { canonicalBase: "" },
      basePath: "",
      sassOptions: {},
      trailingSlash: false,
      i18n: null,
      productionBrowserSourceMaps: false,
      optimizeFonts: true,
      excludeDefaultMomentLocales: true,
      serverRuntimeConfig: {},
      publicRuntimeConfig: {},
      reactStrictMode: true,
      httpAgentOptions: { keepAlive: true },
      outputFileTracing: true,
      staticPageGenerationTimeout: 60,
      swcMinify: true,
      output: "standalone",
      experimental: {
        preCompiledNextServer: false,
        fetchCache: false,
        middlewarePrefetch: "flexible",
        optimisticClientCache: true,
        manualClientBasePath: false,
        legacyBrowsers: false,
        newNextLinkBehavior: true,
        cpus: 9,
        sharedPool: true,
        isrFlushToDisk: true,
        workerThreads: false,
        pageEnv: false,
        optimizeCss: false,
        nextScriptWorkers: false,
        scrollRestoration: false,
        externalDir: false,
        disableOptimizedLoading: false,
        gzipSize: true,
        swcFileReading: true,
        craCompat: false,
        esmExternals: true,
        appDir: false,
        isrMemoryCacheSize: 52428800,
        fullySpecified: false,
        outputFileTracingRoot: "",
        swcTraceProfiling: false,
        forceSwcTransforms: false,
        largePageDataBytes: 128000,
        enableUndici: false,
        adjustFontFallbacks: false,
        adjustFontFallbacksWithSizeAdjust: false,
        fontLoaders: [
          { loader: "@next/font/google" },
          { loader: "@next/font/local" },
        ],
        trustHostHeader: false,
      },
      configFileName: "next.config.js",
    },
  });
  handler = nextServer.getRequestHandler();

  console.log(
    "Listening on port",
    currentPort,
    "url: http://" + hostname + ":" + currentPort
  );
});
