import load from "load-script";
const cache: Record<string, boolean> = {};

export const loadScripts = (basePath: string, scriptPaths: string[]) =>
  Promise.all(
    scriptPaths
      .filter((url) => !cache[url])
      .map((url) => {
        cache[url] = true;

        if (/\.css$/.test(url)) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = basePath + url;
          document.head.appendChild(link);
          return;
        }

        return new Promise<void>((resolve) =>
          load(basePath + url, {}, function (err, script) {
            if (err) {
              console.log(err);
            }
            resolve();
          })
        );
      })
  );

const scriptPaths = ["/dash.all.min.js", "/hls.min.js", "/player.all.js", "/player.css"];
const basePath = "https://ru.spbtv.com/spbtvplayer/latest";

export const loadPlayerAssets = () => loadScripts(basePath, scriptPaths);
export const getPlayerAssetsLoaded = (): boolean =>
  scriptPaths.every((scriptPath) => !!cache[basePath + scriptPath]);
