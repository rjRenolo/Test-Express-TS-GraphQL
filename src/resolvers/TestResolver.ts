import { Arg, Query, Int, ObjectType, Field, Resolver, Mutation } from "type-graphql";
import fs from 'fs';


@ObjectType()
class DatesType {
    @Field(() => Date)
    startDate: Date;

    @Field(() => Date)
    endDate: Date;

    @Field(() => Int)
    num_days: number;
}

@ObjectType()
class ContentsType {
    @Field(() => String)
    contents: string;

    @Field(() => Number)
    file_size: number;
}

@Resolver()
export class TestResolver {
    @Query(() => DatesType)
    async dates(
        @Arg("start_date", () => Date) startDate: Date,
        @Arg("end_date", () => Date) endDate: Date
    ){
        return {
            startDate,
            endDate,
            num_days: (endDate.getTime() - startDate.getTime()) / 86400000
        }
        ;
    }


    @Mutation(() => ContentsType)
    async saveContents(
        @Arg("contents", () => String) contents: string,
    ){
        // write contents to contents.txt
        fs.writeFileSync('contents.txt', contents);
        return {
            contents,
            file_size: fs.statSync('contents.txt').size
        }

    }
}


// mutation {
//     saveContents(contents: "some-string-here") {
//         file_size
//     }
// }