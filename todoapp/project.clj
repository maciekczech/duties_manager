(defproject todoapp "0.1.0-SNAPSHOT"
  :description "To Do app"
  :url "http://example.com/FIXME"
  :license {:name "EPL-2.0 OR GPL-2.0-or-later WITH Classpath-exception-2.0"
            :url "https://www.eclipse.org/legal/epl-2.0/"}
  :dependencies [[org.clojure/clojure "1.8.0"]
  															[ring/ring-jetty-adapter "1.8.0"]
                 [compojure "1.6.1"]
                 [ring/ring-defaults "0.3.2"]
                 [hiccup "1.0.5"]
                 [garden "1.3.9"]]
  :main ^:skip-aot todoapp.core
  :repl-options {:init-ns todoapp.core}
		:ring {:handler todoapp.core/application
									:auto-reload? true
									:auto-refresh? false})