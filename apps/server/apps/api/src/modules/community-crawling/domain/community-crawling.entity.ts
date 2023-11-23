import { Column, Entity } from 'typeorm';
import { IdBaseEntityAbstract } from '@Apps/modules/community-crawling/domain/abstract/id.base-entity.abstract';

@Entity({ name: 'community_crawling' })
export class CommunityCrawling extends IdBaseEntityAbstract {
  @Column({ name: 'search_word' })
  searchWord: string;

  @Column({ name: 'related_word' })
  relatedWord: string;

  @Column({ name: 'site_name' })
  siteName: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'url' })
  url: string;

  @Column({ name: 'comment_cnt' })
  commentCnt: number;
}
