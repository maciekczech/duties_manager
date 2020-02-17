(ns todoapp.view.todos
  (:require [todoapp.view.layout :as layout]))

;render homepage using hiccup template
(defn index []
  (layout/homepage "CRUD"))
