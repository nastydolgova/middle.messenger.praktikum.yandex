import { HTTP } from "./HTTP";

it("should perform POST request", async () => {
    const result = await HTTP.post("/auth/logout")
    let response = result.response
    expect(response).toEqual({"reason": "Cookie is not valid"})
})