import { Entity, Column, ObjectIdColumn} from 'typeorm';

@Entity()
export class Comments {

    @ObjectIdColumn()
    id?:string;

    @Column()
    blog_id:string;

    @Column()
    user_id:string;

    @Column()
    content:string;

    @Column()
    date_time:Date;
}

export default Comments;