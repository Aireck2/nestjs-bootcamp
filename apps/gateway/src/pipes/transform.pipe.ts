import { ArgumentMetadata, PipeTransform } from "@nestjs/common";

export class TransformPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(TransformPipe.name, value, metadata);
    return TransformPipe.name;
  }
}
