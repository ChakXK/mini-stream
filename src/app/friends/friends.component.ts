import { Component, OnInit } from '@angular/core';
import { Friend } from '../models/Friend';
import User from '../models/User';
import { FriendsService } from '../services/friends.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
})
export class FriendsComponent implements OnInit {
  querySearch: string = '';
  friends$: Friend[] = [];
  searchResult$: Friend[] = [];
  isSearch: boolean = false;
  constructor(private friendsService: FriendsService) {}

  ngOnInit(): void {
    this.friendsService.getFriends().subscribe((users) => {
      this.friends$ = []
      users.map((user) => {
        if (user) {
          const name = user.name;
          const id = user.id;
          const isFriend = true;
          this.friends$.push({id, name, isFriend });
        }
      });
    });
  }

  onSearch() {
    this.friendsService.search(this.querySearch).subscribe((users) => {
      this.searchResult$ = [];
      users.map((user: User) => {
        if (user) {
          const name = user.name;
          const id = user.id;
          let isFriend = false;
          if (this.friends$.filter(friend => friend.name == name).length > 0)  {
            isFriend = true;
          }
          this.searchResult$.push({id, name, isFriend });
        }
      });
    });
    this.isSearch = true;
  }

  onRemove(friend: Friend){
    friend.isFriend = false;
    this.friendsService.removeFriend(friend.id);
  }
  
  onAdd(friend: Friend){
    friend.isFriend = true;
    this.friendsService.addFriend(friend.id);
  }
}
