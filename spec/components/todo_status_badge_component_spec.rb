require "rails_helper"
require "view_component/test_helpers" 

RSpec.describe TodoStatusBadgeComponent, type: :component do
  include ViewComponent::TestHelpers
  it"render green badge for cpmpleted status" do
    render_inline(TodoStatusBadgeComponent.new(status: "completed", overdue: false))

    expect(rendered_content).to include("เสร็จสิ้น")
    expect(rendered_content).to include("bg-green-100")
  end
  it"render red badge for overdue status" do
    render_inline(TodoStatusBadgeComponent.new(status: "pending", overdue: true))

    expect(rendered_content).to include("เลยกำหนด")
    expect(rendered_content).to include("bg-red-100")
  end
  it"render blue badge for in_progress status" do
    render_inline(TodoStatusBadgeComponent.new(status: "in_progress", overdue: false))

    expect(rendered_content).to include("กำลังทำ")
    expect(rendered_content).to include("bg-blue-100")
  end
end