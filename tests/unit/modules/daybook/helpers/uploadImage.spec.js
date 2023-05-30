import uploadImage from "@/modules/daybook/helpers/uploadImage";
import axios from "axios";

jest.mock("axios");

describe("uploadImage", () => {
  it("returns secure_url when passed a file", async () => {
    const expectedUrl = "https://res.cloudinary.com/aalvag/image/upload/test.jpg";

    // Mocking axios.post to return the expected data
    axios.post.mockResolvedValueOnce({ data: { secure_url: expectedUrl } });

    // Creating a mock file object with dummy content
    const file = new File(["test"], "test.jpg", { type: "image/jpeg" });

    // Calling the uploadImage function with our mock file
    const result = await uploadImage(file);

    expect(result).toBe(expectedUrl);
  });

  it("returns null when not passed a file", async () => {
    const result = await uploadImage();

    expect(result).toBeNull();
  });
});
