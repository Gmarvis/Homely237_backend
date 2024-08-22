export class CreateEmailDto {
  receiver: string;
  subject: string;
  text: string;
  html?: {
    templateName: string;
    options: Record<string, string>
  };
}
