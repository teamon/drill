defmodule Drill.Loaders.HttpJson do
  use Tesla.Builder

  with Tesla.Middleware.DecodeJson

  adapter Tesla.Adapter.Ibrowse
end


defmodule Drill.SourcesController do
  require Logger
  use Drill.Web, :controller

  @sources [
    %{
      id: "ds1",
      name: "Users",
      type: "http+json",
      params: %{
        url: "http://jsonplaceholder.typicode.com/users"
      }
    },
    %{
      id: "ds2",
      name: "Todos",
      type: "http+json",
      params: %{
        url: "http://jsonplaceholder.typicode.com/todos"
      }
    }
  ]

  def index(conn, _params) do
    conn |> json(@sources)
  end

  def show(conn, %{"id" => id}) do
    source = @sources |> Enum.find(fn s -> s.id == id end)
    data = fetch_data(source)

    conn |> json(%{source: source, data: data})
  end

  defp fetch_data(%{type: "http+json"} = source) do
    Logger.debug "load http+json #{source.params.url}"
    Drill.Loaders.HttpJson.get(source.params.url).body
  end
end
