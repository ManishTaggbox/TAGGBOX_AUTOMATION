import { test, expect } from '../fixtures.js';
import UploadCSVFile from '../../pageobjects/productcatalog/uploadCSVFile.js';
import SearchProduct from '../../pageobjects/productcatalog/searchProduct.js';
import EditProduct from '../../pageobjects/productcatalog/editProduct.js';
import DeleteProduct from '../../pageobjects/productcatalog/deleteProduct.js';
import AddProduct from '../../pageobjects/productcatalog/addProduct.js';


test('@UploadCSVFile', async ({ page, token }) => {
    await page.addInitScript(t => localStorage.setItem('token', t), token);
    await page.goto('https://app.taggbox.com/content/products');
    const uploadCSV = new UploadCSVFile(page);
    await uploadCSV.csvUpload();
});

test('@SearchProduct', async ({ page, token }) => {
    await page.addInitScript(t => localStorage.setItem('token', t), token);
    await page.goto('https://app.taggbox.com/content/products');
    const searchProduct = new SearchProduct(page);
    await searchProduct.searchProduct();
});

test('@EditProduct', async ({ page, token }) => {
    await page.addInitScript(t => localStorage.setItem('token', t), token);
    await page.goto('https://app.taggbox.com/content/products');
    const editProduct = new EditProduct(page);
    await editProduct.editProduct();
});

test('@DeleteSingleAndMultipleProducts', async ({ page, token }) => {
    await page.addInitScript(t => localStorage.setItem('token', t), token);
    await page.goto('https://app.taggbox.com/content/products');
    const deleteProduct = new DeleteProduct(page);
    await deleteProduct.deleteProduct();
    await deleteProduct.deleteMultipleProducts();
});

test('@AddProduct', async ({ page, token }) => {
    await page.addInitScript(t => localStorage.setItem('token', t), token);
    await page.goto('https://app.taggbox.com/content/products');
    const addProduct = new AddProduct(page);
    await addProduct.addProduct();
});