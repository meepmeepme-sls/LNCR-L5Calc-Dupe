import { onRequest as __api_scrape_points_js_onRequest } from "G:\\My Drive\\Late Night Combat Robotics\\LNCR-L5-Dupe\\functions\\api\\scrape-points.js"
import { onRequest as ___middleware_js_onRequest } from "G:\\My Drive\\Late Night Combat Robotics\\LNCR-L5-Dupe\\functions\\_middleware.js"

export const routes = [
    {
      routePath: "/api/scrape-points",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_scrape_points_js_onRequest],
    },
  {
      routePath: "/",
      mountPath: "/",
      method: "",
      middlewares: [___middleware_js_onRequest],
      modules: [],
    },
  ]