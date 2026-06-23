class TodosController < ApplicationController
  before_action :set_todo, only: %i[ show edit update destroy ]

  def index
    @todos = Todo.all
    if params[:query].present?
      @todos = @todos.where("title ILIKE ?", "%#{params[:query]}%")
    end

    case params[:status]
    when "completed"
      @todos = @todos.completed
    when "in_progress"
      @todos = @todos.in_progress
    when "pending"
      @todos = @todos.pending
    when "overdue"
      @todos = @todos.where.not(status: :completed).where("due_date < ?", Time.current)
    end
    @todos = @todos.order(created_at: :desc)
  end

  def show
  end

  def new
    @todo = Todo.new
  end

  def edit
  end

  def create
    @todo = Todo.new(todo_params)
    respond_to do |format|
      if @todo.save
        format.html { redirect_to todos_path, notice: "สร้างสำเร็จ" }
        format.turbo_stream
      else
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @todo.update(todo_params)
        format.html { redirect_to todos_path, notice: "แก้ไขสำเร็จ" }
        format.turbo_stream
      else
          format.html { render :edit, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @todo.destroy
    respond_to do |format|
      format.html { redirect_to todos_url, notice: "ลบสำเร็จ", status: :see_other }
      format.turbo_stream
    end
  end

  private

  def set_todo
    @todo = Todo.find(params[:id])
  end

  def todo_params
    params.require(:todo).permit(:title, :description, :status, :due_date)
  end
end