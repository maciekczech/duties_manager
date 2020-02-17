(ns todoapp.view.layout
  (:require [hiccup.page :as h]
  [todoapp.view.layout :as layout]))

;definition of homepage - includes self-invoking script that runs the logic
(defn homepage [title & body]
  (h/html5
   [:head
    [:meta {:charset "utf-8"}]
    [:meta {:http-equiv "X-UA-Compatible" :content "IE=edge,chrome=1"}]
    [:meta {:name "viewport" :content
            "width=device-width, initial-scale=1, maximum-scale=1"}]
    [:title title]
    (h/include-css "style.css")
    (h/include-js "script.js")]
   [:body
   [:h1 {:font "Calibri"} "Manage your duties and responsibilities"]
   [:div {:id "panel" :class "part1"}]

   [:div {:id "container" :class "part2"} body]]))

;definition of generic html page
(defn common [title & body]
  (h/html5
   [:head
    [:meta {:charset "utf-8"}]
    [:meta {:http-equiv "X-UA-Compatible" :content "IE=edge,chrome=1"}]
    [:meta {:name "viewport" :content
            "width=device-width, initial-scale=1, maximum-scale=1"}]
    [:title title]
    [:body
    [:div {:id "header"}
     [:h1 {:class "container"} "DUTIES MANAGER"]]
    [:div {:id "content" :class "container"} body]]]))

;definition of 404 handler
(defn four-oh-four []
  (common "Page Not Found"
          [:div {:id "four-oh-four"}
          "The page you requested could not be found"]))
