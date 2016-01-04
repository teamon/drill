defmodule Drill.PageController do
  use Drill.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
