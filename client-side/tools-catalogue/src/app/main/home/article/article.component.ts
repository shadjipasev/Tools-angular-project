import { Component } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent {
  articles = [
    {
      image:
        'https://theyellowspot.com/wp-content/uploads/2019/05/Goal-Setting.jpg',
      title: 'Article 1',
      description: 'Description of article 1',
      link: '',
    },
    {
      image:
        'https://theyellowspot.com/wp-content/uploads/2019/05/Goal-Setting.jpg',
      title: 'Article 2',
      description: 'Description of article 2',
      link: '',
    },
    // Add more articles as needed
  ];
}
