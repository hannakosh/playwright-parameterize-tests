export * from '@playwright/test';

import { test as base, expect } from '@playwright/test';

type Mode = 'light' | 'dark';

export type TestOptions = {
    mode: Mode;
}

type TestFixtures = {
    setMode: void;
}

export const test = base.extend<TestOptions & TestFixtures>({
    mode: ['light', {option: true}],

    // https://playwright.dev/docs/test-fixtures#automatic-fixtures
    setMode: [async ({ page, isMobile, mode}, use) => {
        const changeModeButton = page.getByRole('button', { name: 'Switch between dark and light mode' })   
        const getMode = async (): Promise<Mode> => await page.locator('html').getAttribute('data-theme') as Mode;

        await page.goto('/');

        if (isMobile && await getMode() !== mode) {
            await page.getByLabel('Toggle navigation bar').click();
            await changeModeButton.click();
            await page.getByLabel('Close navigation bar').click();
        } else if (await getMode() !== mode) await changeModeButton.click();
        
        expect (await getMode()).toBe(mode);
        
        await use();
    }, { auto: true }]
})

