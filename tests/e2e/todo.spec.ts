import { test, expect } from '@playwright/test';

test.describe('Todo List E2E', () => {
    
    test.beforeEach(async ({ page }) =>{
        await page.goto('/')
    });

    test('should display the main page correctly', async ({ page }) => {                                                                                                                                                                                                                                                                                        
        await expect(page.locator('h1')).toContainText('Todo List');                                                                                                                                   
    });
    test('should create a new todo and then delete it', async ({ page }) => {                                                                                                                        
        // 1. กดปุ่ม "เพิ่มงานใหม่"                                                                                                                                                                         
        await page.click('text=เพิ่มงานใหม่');                                                                                                                                                            
                                                                                                                                                                                                       
        // 2. กรอกฟอร์ม                                                                                                                                                                                 
        await page.fill('label:has-text("หัวข้องาน") + input', 'Playwright E2E Task');                                                                                                                   
        await page.fill('label:has-text("รายละเอียด") + textarea', 'Testing UI with Playwright');                                                                                                       
                                                                                                                                                                                                       
        // 3. กดบันทึกข้อมูล                                                                                                                                                                               
        await page.click('text=บันทึกข้อมูล');                                                                                                                                               
                                                                                                                                                                                                       
        // 4. ตรวจสอบว่างานถูกแสดงในรายการ                                                                                                                                                               
        await expect(page.locator('text=Playwright E2E Task')).toBeVisible();                                                                                                                          
                                                                                                                                                                                                       
        // 5. กดปุ่ม "ลบ" สำหรับงานที่เราเพิ่งสร้าง                                                                                                                                                             
        // และตอบตกลงการแจ้งเตือน (Confirm Dialog)                                                                                                                                                       
        page.on('dialog', async dialog => {                                                                                                                                                            
          await dialog.accept();                                                                                                                                                                       
        });                                                                                                                                                                                            
                                                                                                                                                                                                       
        // ค้นหากล่อง Todo ของเราแล้วกดลบ                                                                                                                                                                 
        const todoRow = page.locator('div', { hasText: 'Playwright E2E Task' });                                                                                                                       
        await todoRow.locator('button:has-text("ลบ")').click();                                                                                                                                        
                                                                                                                                                                                                       
        // 6. ตรวจสอบว่าข้อความถูกลบออกไปจากหน้าจอแล้ว                                                                                                                                                      
        await expect(page.locator('text=Playwright E2E Task')).not.toBeVisible();                                                                                                                      
      });    
})