class TodoStatusBadgeComponent < ViewComponent::Base
  def initialize(status:, overdue:)
    @status = status
    @overdue = overdue
  end
  def badge_color_class
    if@overdue
      "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
    else
      case @status
      when "completed"
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      when "in_progress"
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      else 
        "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400" 
      end
    end
  end
  def status_text
    if @overdue
      "เลยกำหนด"
    else
      case @status
      when "completed"
        "เสร็จสิ้น"
      when "in_progress"
        "กำลังทำ"
      else
        "รอดำเนินการ"
      end
    end
  end
end