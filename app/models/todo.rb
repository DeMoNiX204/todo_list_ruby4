class Todo < ApplicationRecord

  validates :title, presence: true
  enum :status, {
    pending: "pending",
    in_progress: "in_progress",
    completed: "completed"
  },default: :pending

  def overdue?
    !completed? && due_date.present? && due_date < Time.current
  end
end