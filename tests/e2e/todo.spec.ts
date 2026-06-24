import { test, expect } from '@playwright/test';                                                                               
                                                                                                                                   
    test.describe('Todo List E2E', () => {                                                                                         
                                                                                                                                   
        test.beforeEach(async ({ page }) =>{                                                                                       
            await page.goto('/')                                                                                                   
        });                                                                                                                        
                                                                                                                                   
        test('should display the main page correctly', async ({ page }) => {                                                       
            await expect(page.locator('h1')).toContainText('Todo List');                                                           
        });                                                                                                                        
                                                                                                                                   
        test('should create a new todo and then delete it', async ({ page }, testInfo) => {                                        
            // สร้างชื่อหัวข้องานแบบเฉพาะเจาะจงของแต่ละ Browser                                                                          
            const taskTitle = `Playwright E2E Task - ${testInfo.project.name}`;                                                    
                                                                                                                                   
            await test.step ('1. กดปุ่ม "เพิ่มงานใหม่" ', async () =>{                                                                  
                await page.click('text=เพิ่มงานใหม่');                                                                                
            });                                                                                                                    
                                                                                                                                   
            await test.step ('2. กรอกฟอร์ม ', async () =>{                                                                          
                await page.fill('label:has-text("หัวข้องาน") + input', taskTitle);                                                   
                await page.fill('label:has-text("รายละเอียด") + textarea', 'Testing UI with Playwright');                           
            });                                                                                                                    
                                                                                                                                   
            await test.step ('3. กดบันทึกข้อมูล ', async () =>{                                                                        
                await page.click('text=บันทึกข้อมูล');                                                                                 
            });                                                                                                                    
                                                                                                                                   
            await test.step ('4. ตรวจสอบว่างานถูกแสดงในรายการ ', async () =>{                                                        
                await expect(page.locator(`text=${taskTitle}`)).toBeVisible();                                                     
             });                                                                                                                   
                                                                                                                                   
            await test.step ('5. เตรียมตอบตกลง Confirm Dialog ก่อนกดลบ ', async () =>{                                               
                page.on('dialog', async dialog => {                                                                                
                    await dialog.accept();                                                                                         
                });                                                                                                                
            });                                                                                                                    
                                                                                                                                   
            await test.step ('6. ค้นหากล่อง Todo ของเราแล้วกดลบ ', async () =>{                                                       
                const todoRow = page.locator('turbo-frame[id^="todo_"]', { hasText: taskTitle }).first();                                               
                await todoRow.locator('button:has-text("ลบ")').click();                                                            
            });                                                                                                                    
            await test.step ('7. ตรวจสอบว่าข้อความถูกลบออกไปจากหน้าจอแล้ว', async () =>{                                                
                await expect(page.locator(`text=${taskTitle}`)).not.toBeVisible();                                                 
            });                                                                                                                    
        });                                                                                                                        
                                                                                                                                   
        test('should toggle a todo status using the checkbox', async ({ page }, testInfo) => {                                     
            // สร้างชื่อหัวข้องานแบบเฉพาะเจาะจงของแต่ละ Browser                                                                          
            const taskTitle = `Toggle Test Task - ${testInfo.project.name}`;                                                       
                                                                                                                                   
            // 1. สร้างงานใหม่เพื่อทำการทดสอบ                                                                                           
            await test.step('1. สร้างงานใหม่สำหรับทดสอบ Toggle', async () => {                                                         
                await page.click('text=เพิ่มงานใหม่');                                                                                
                await page.fill('label:has-text("หัวข้องาน") + input', taskTitle);                                                   
                await page.click('text=บันทึกข้อมูล');                                                                                 
            });                                                                                                                    
                                                                                                                                   
            const todoRow = page.locator('turbo-frame[id^="todo_"]', { hasText: taskTitle }).first();                                                   
                                                                                                                                   
            // 2. ตรวจสอบว่า Badge เริ่มต้นแสดงเป็น "รอดำเนินการ"                                                                         
            await test.step('2. ตรวจสอบสถานะเริ่มต้นเป็น รอดำเนินการ', async () => {                                                     
                await expect(todoRow.locator('text=รอดำเนินการ')).toBeVisible();                                                     
            });                                                                                                                    
                                                                                                                                   
            // 3. คลิกติ๊ก Checkbox เพื่อเปลี่ยนเป็นเสร็จสิ้น                                                                                 
            await test.step('3. ติ๊กสลับสถานะผ่าน Checkbox', async () => {                                                             
                const checkbox = todoRow.locator('input[type="checkbox"]');                                                        
                await checkbox.click();                                                                                            
                                                                                                                                   
                // ตรวจสอบว่า Badge เปลี่ยนเป็น "เสร็จสิ้น" ทันที                                                                           
                await expect(todoRow.locator('text=เสร็จสิ้น')).toBeVisible();                                                        
            });                                                                                                                    
                                                                                                                                   
            // 4. คลิกติ๊ก Checkbox อีกครั้งเพื่อยกเลิก                                                                                     
            await test.step('4. ติ๊กสลับสถานะกลับเป็น รอดำเนินการ', async () => {                                                         
                const checkbox = todoRow.locator('input[type="checkbox"]');                                                        
                await checkbox.click();                                                                                            
                                                                                                                                   
                // ตรวจสอบว่า Badge สลับคืนเป็น "รอดำเนินการ"                                                                            
                await expect(todoRow.locator('text=รอดำเนินการ')).toBeVisible();                                                     
            });                                                                                                                    
                                                                                                                                   
            // 5. ลบงานที่ใช้ทดสอบออก                                                                                                 
            await test.step('5. ลบงานทดสอบออกเพื่อเคลียร์ข้อมูล', async () => {                                                          
                page.on('dialog', async dialog => {                                                                                
                    await dialog.accept();                                                                                         
                });                                                                                                                
                await todoRow.locator('button:has-text("ลบ")').click();
                await expect(page.locator(`text=${taskTitle}`)).not.toBeVisible();
            });
        });
    })