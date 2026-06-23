# ข้อมูลการตั้งค่าโปรเจกต์ Todo List
โปรเจกต์นี้ได้รับการพัฒนาขึ้นโดยมีรายละเอียดและโครงสร้างการตั้งค่าสำคัญดังนี้:

*   **ฐานข้อมูล (Database):** เปลี่ยนมาใช้งาน PostgreSQL สำหรับจัดเก็บข้อมูลในเครื่อง (Local Database)
    *   Development DB: `todo_list_development`
    *   Test DB: `todo_list_test`
*   **การทดสอบหลังบ้าน (Backend Testing):** ใช้ RSpec (`spec/`) ในการทำ TDD (Test-Driven Development)
    *   คำสั่งรัน Unit Test ของโมเดล: `bundle exec rspec spec/models/todo_spec.rb`
    *   คำสั่งรัน Request Test ของคอนโทรลเลอร์: `bundle exec rspec spec/requests/todos_spec.rb`
*   **การทดสอบหน้าบ้าน (Frontend E2E Testing):** ใช้ Playwright (Node.js) ในการจำลองและตรวจสอบพฤติกรรมการกดใช้งานเบราว์เซอร์จริง
    *   ไฟล์ทดสอบหลักถูกเขียนไว้ที่: `tests/e2e/todo.spec.ts`
    *   คำสั่งรัน UI Mode: `npx playwright test tests/e2e/todo.spec.ts --ui`
    *   Playwright จะเปิดบูต Rails Server ในโหมด Test ที่พอร์ต 3000 ให้เองโดยอัตโนมัติขณะรันเทส E2E
*   **ข้อกำหนดและแนวทางการเขียน Hotwire / Turbo:**
    *   สถานะของ Todo ใช้คอลัมน์ `status` (Enum: `pending`, `in_progress`, `completed`)
    *   เมื่อกดปุ่มหรือส่งคำสั่งที่อยู่ภายใน `turbo-frame` และประสงค์จะย้ายหน้าจอเว็บย้อนกลับ (Redirect) ให้ระบุปลายทางเป็นระดับหน้าจอหลักเสมอโดยการใส่ `form: { data: { turbo_frame: "_top" } }` เพื่อป้องกันปัญหา Turbo Frame "Content Missing"
