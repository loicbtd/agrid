export class Faq {
  question!: string;

  answer!: string;

  public constructor(attributes?: Partial<Faq>) {
    Object.assign(this, attributes);
  }
}
