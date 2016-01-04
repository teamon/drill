ExUnit.start

Mix.Task.run "ecto.create", ~w(-r Drill.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r Drill.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(Drill.Repo)

