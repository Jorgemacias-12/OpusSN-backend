import { Get, Route, SuccessResponse } from 'tsoa';

@Route("/categories")
export class CategoriesController {
  @Get("/")
  @SuccessResponse("200", "Sucess")
  public async getCategories(): Promise<{ message: string }> {
    return {
      message: ""
    }
  }
}

