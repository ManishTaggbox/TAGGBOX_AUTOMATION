import { test, expect } from '../fixtures.js';
import UploadCSVFile from '../../pageobjects/productcatalog/uploadCSVFile.js';
import SearchProduct from '../../pageobjects/productcatalog/searchProduct.js';
import EditProduct from '../../pageobjects/productcatalog/editProduct.js';
import DeleteProduct from '../../pageobjects/productcatalog/deleteProduct.js';
import AddProduct from '../../pageobjects/productcatalog/addProduct.js';

const PRODUCT_CATALOG_URL = 'https://app.taggbox.com/content/products';

// Helper function to setup authentication and navigate
async function setupPage(page, token, url = PRODUCT_CATALOG_URL) {
    await page.addInitScript(token => localStorage.setItem('token', token), token);
    await page.goto(url);
}

test.describe('Product Catalog Tests', () => {
    
    test('@UploadCSVFile - Upload products via CSV file', async ({ page, token }) => {
        await setupPage(page, token);
        const uploadCSV = new UploadCSVFile(page);
        await uploadCSV.csvUpload();
    });

    test('@SearchProduct - Search products by name and SKU', async ({ page, token }) => {
        await setupPage(page, token);
        const searchProduct = new SearchProduct(page);
        await searchProduct.searchProduct();
    });

    test('@EditProduct - Edit existing product details', async ({ page, token }) => {
        await setupPage(page, token);
        const editProduct = new EditProduct(page);
        await editProduct.editProduct();
    });

    test('@DeleteSingleAndMultipleProducts - Delete single and multiple products', async ({ page, token }) => {
        await setupPage(page, token);
        const deleteProduct = new DeleteProduct(page);
        
        await test.step('Delete single product', async () => {
            await deleteProduct.deleteProduct();
        });
        
        await test.step('Delete multiple products', async () => {
            await deleteProduct.deleteMultipleProducts();
        });
    });

    test('@AddProduct - Add new product to catalog', async ({ page, token }) => {
        await setupPage(page, token);
        const addProduct = new AddProduct(page);
        await addProduct.addProduct();
    });
});

// Alternative approach with beforeEach hook for common setup
// test.describe.alternative('Product Catalog Tests - Alternative Setup', () => {
    
//     test.beforeEach(async ({ page, token }) => {
//         await setupPage(page, token);
//     });

//     test('@UploadCSVFile', async ({ page }) => {
//         const uploadCSV = new UploadCSVFile(page);
//         await uploadCSV.csvUpload();
//     });

//     test('@SearchProduct', async ({ page }) => {
//         const searchProduct = new SearchProduct(page);
//         await searchProduct.searchProduct();
//     });

//     test('@EditProduct', async ({ page }) => {
//         const editProduct = new EditProduct(page);
//         await editProduct.editProduct();
//     });

//     test('@DeleteSingleAndMultipleProducts', async ({ page }) => {
//         const deleteProduct = new DeleteProduct(page);
//         await deleteProduct.deleteProduct();
//         await deleteProduct.deleteMultipleProducts();
//     });

//     test('@AddProduct', async ({ page }) => {
//         const addProduct = new AddProduct(page);
//         await addProduct.addProduct();
//     });
// });