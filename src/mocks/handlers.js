import { rest } from "msw";

const baseURL = "https://bookhub-rdf-api-9aad7672239c.herokuapp.com/";
export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        pk: 2,
        username: "booklover",
        email: "booklover@example.com",
        first_name: "Book",
        last_name: "Lover",
        profile_id: 2,
        profile_image: "https://res.cloudinary.com/dybqzflbo/image/upload/v1694521251/default-user-image.png",
      })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
