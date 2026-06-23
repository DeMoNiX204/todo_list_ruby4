require "rails_helper"

RSpec.describe Todo, type: :model do
  describe "validations" do
    it "is invalid without a title" do
      todo = Todo.new(title: nil)
      expect(todo).not_to be_valid
    end

    it "is valid with a title" do
      todo = Todo.new(title: "Buy groceries")
      expect(todo).to be_valid
    end
  end

  describe "default status" do
    it "defaults to pending status" do
      todo = Todo.new(title: "Buy groceries")
      expect(todo.status).to eq("pending")
    end
  end

  describe "#overdue?" do
    it "returns true when not completed and due date is in the past" do
      todo =Todo.new(title: "Task", status: :pending, due_date: 1.day.ago)
      expect(todo.overdue?).to be true
    end

    it "return false when completed and due date is in past" do
      todo = Todo.new(title: "Task", status: :completed, due_date: 1.day.ago)
      expect(todo.overdue?).to be false
    end

    it "returns false when due date is in the future" do
      todo = Todo.new(title: "Task", status: :pending, due_date: 1.day.from_now)
      expect(todo.overdue?).to be false
    end
  end
end