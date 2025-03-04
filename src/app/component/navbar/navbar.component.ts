import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { CredentialService } from 'src/app/services/credential.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  userName = '';
  userImage: any = '../assets/images/default-user.png';
  userRole = '';

  subscription: Subscription = new Subscription();

  constructor(
    private sanitizer: DomSanitizer,
    private credential: CredentialService,
    private event: EventService) {
    this.onPreInit();
  }

  onPreInit() {
    this.subscription.add(
      this.event.subscribe('set-user-name-image', response => {
        this.getUserNameAndImage();
      })
    );
  }

  ngOnInit(): void {
    this.getUserNameAndImage();
  }

  setUserNameAndImage(empDetail: any): void {
    const detail = empDetail || {};
    if (detail.name) {
      this.userName = detail.name;
      this.userRole = detail.role || '';
      const userImage = detail.image || '';
      
      if (userImage) {
        const imageSource = 'data:image/jpeg;base64,' + userImage;
        this.userImage = this.sanitizer.bypassSecurityTrustUrl(imageSource);
      }
      else {
        this.userImage = '../assets/images/default-user.png';
      }
    }
  }

  getUserNameAndImage() {
    const userName = this.credential.getLoginCredentials('Employee_Name');
    const userImage = localStorage.getItem('Employee_Image');
    const userRole = this.credential.getLoginCredentials('Software_Rights_Group');

    this.setUserNameAndImage({ name: userName, image: userImage, role: userRole });
  }

  logOut() {
    this.credential.restoreInfo(true);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.event.destroy('set-user-name-image');
  }

}
