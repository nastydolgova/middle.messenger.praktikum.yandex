import { PathRouter } from "./Router/PathRouter";
import Block from "./Block";

jest.mock('nanoid', () => {
    return {
        nanoid: (num: number) => Math.floor(Math.random() * num)
    }
})

describe('Router', () => {
    const router = new PathRouter();

    test('should update history after route to new page', () => {
        router.go('/sign-up');
        expect(window.history.length).toBe(2);
    });
});