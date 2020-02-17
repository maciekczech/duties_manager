(ns todoapp.controller.todos
  (:require [compojure.core :refer [defroutes GET POST]]
            [todoapp.view.todos :as view]))

;call to the view module which 'renders' the page
(defn index []
  (view/index))


;here I would manage and route all kinds of different subpages and various requests if I implemented any :<
(defroutes routes
  (GET  "/" [] (index)))

