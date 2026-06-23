require 'rails_helper'

RSpec.describe "Todos", type: :request do
  let!(:pending_todo) { Todo.create!(title: "Learn Rails", status: "pending", due_date: 1.day.from_now) }
  let!(:completed_todo) { Todo.create!(title: "Buy milk", status: "completed", due_date: 1.day.from_now) }

  describe "GET /todos" do
    it "return HTTP success" do
      get todos_path
      expect(response).to have_http_status(:success)
    end

    it "filter todds by search query" do
      get todos_path, params: { query: "Rails" }
      expect(response.body).to include("Learn Rails")
      expect(response.body).to_not include("Buy milk")
    end

    it "filters todos by status completed" do
          get todos_path, params: { status: "completed" }
          expect(response.body).to include("Buy milk")
          expect(response.body).not_to include("Learn Rails")
    end
  end

  describe "POST /todos" do
    it "creates a new Todo and redirects" do
      expect { post todos_path, params: { todo: { title: "New Task", status: "pending" } } }.to change(Todo, :count).by(1)
      expect(response).to redirect_to(todos_path)
    end
  end
  describe "DELETE /todos/:id" do
    it "destroys the todo and redirects to index" do
      expect { delete todo_path(pending_todo) }.to change(Todo, :count).by(-1)
      expect(response).to redirect_to(todos_url)
    end
  end
end
