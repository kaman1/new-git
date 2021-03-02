import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Post {
  readonly id: string;
  readonly shipname?: string;
  readonly latitude?: number;
  readonly longitude?: number;
  readonly imonumber?: string;
  readonly nauticalmile?: string;
  readonly bearing?: string;
  readonly degree?: string;
  readonly image?: string;
  readonly owner?: string;
  readonly createdAt?: string;
  constructor(init: ModelInit<Post>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}