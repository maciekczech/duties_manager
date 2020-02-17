(ns todoapp.core
  (:require [compojure.core :refer [defroutes]]
            [ring.adapter.jetty :as ring]
            [compojure.route :as route]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]
            [todoapp.controller.todos :as todos]
            [todoapp.view.layout :as layout])
  (:gen-class))


(defroutes routes
  todos/routes	;routes (actually only one route :| ) from our controller
  (route/resources "/") ;allows to use .css and .js resources from resources/public
  (route/not-found (layout/four-oh-four))) 	;routing for any not implemented route

(def application (wrap-defaults routes site-defaults))

(defn start [port]
  (ring/run-jetty application {:port port
                               :join? false}))

(defn -main []
  (let [port (Integer. (or (System/getenv "PORT") "8080"))]
  (start port)
  (println (str "Running webserver at http:/127.0.0.1:" port "/")))
  )