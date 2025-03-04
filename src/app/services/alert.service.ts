import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr/toastr/toastr.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(
    private router: Router,
    // private toastService: ToastrService,
  ) { }

  /**
   * Shows a sweet alert with title and text. Then we can use optional navigate option
   * if required.
   *
   * @param message Alert title message
   * @param content Content text of the alert
   * @param url Optional url to redirect after any response from alert
   */
  successAlert(titleMessage: string, content?: string, url?: string) {
    Swal.fire({
      title: titleMessage,
      text: content ? content : '',
      icon: 'success',
      heightAuto: false
    }).then(() => {
      if (url) {
        this.router.navigateByUrl(url);
      }
    });
  }

  /**
   * Shows sweet alert with error icon
   * Normally used to show error responses/failed operations from server.
   *
   * @param titleMessage A title of alert, which will be shown in bold format
   * @param content text of alert
   */
  errorAlert(titleMessage: string, content?: string, url?: string) {
    // if (!titleMessage) {
    //   // this.presentToast('error');
    //   this.toastr.success('titleMessage');
    //   return;
    // }
    Swal.fire({
      title: titleMessage,
      text: content ? content : '',
      icon: 'warning',
      heightAuto: false
    }).then(() => {
      if (url) {
        this.router.navigateByUrl(url);
      }
    });
  }

  /**
   * Shows sweet toast on top right corner of the page
   * But this doesn't looks good for mobile devices, so for mobile we show as regular toast
   *
   * @param message Text to show as toast
   * @param timeout Time duration of the toast
   */
  showMixinAlert(message: string, timeout?: any, redirectUrl = '') {
    const toastMessage = message ? message : '';
    const duration = timeout || 1500;

    const Toast = Swal.mixin({
      toast: true,
      // background: '#b3d6ba',
      // background: '#ffffff',
      position: 'top-end',
      showConfirmButton: false,
      timer: duration,
      timerProgressBar: true,
      // onOpen: (toast) => {
      //   toast.addEventListener('mouseenter', Swal.stopTimer);
      //   toast.addEventListener('mouseleave', Swal.resumeTimer);
      // }
    });

    Toast.fire({
      icon: 'success',
      title: toastMessage
    });

    if (redirectUrl) {
      const timeOutID = setTimeout(() => { this.router.navigateByUrl(redirectUrl); clearInterval(timeOutID); }, (duration + 1000));
    }
  }

  /**
   * Shows a sweet alert with title and text. Then we can use optional navigate option
   * if required.
   *
   * @param message Alert title message
   * @param content Content text of the alert
   * @param url Optional url to redirect after any response from alert
   */
  infoAlert(content?: string) {
    Swal.fire({
      // title: titleMessage,
      // text: content ? content : '',
      html: content,
      icon: 'info',
      heightAuto: false,
      customClass: {
        popup: 'sweet-alert-info-format'
      }
    }).then(() => {
      // if (url) {
      //   this.router.navigateByUrl(url);
      // }
    });
  }


  noResponseAlert(message?: string) {
    Swal.fire({
      title: 'No response from server',
      text: message ? message : '',
      icon: 'warning',
      heightAuto: false
    });
  }

  toastAlert(type: string, title: string, message?: string) {
    this.toast(title);
    // switch (type) {
    //   case 'warning':
    //     this.toastService.warning(title, message, {
    //       enableHtml: true
    //     });
    //     break;
    //   case 'error':
    //     this.toastService.error(title, message);
    //     break;
    //   case 'info':
    //     this.toastService.info(title, message);
    //     break;
    //   default:
    //     this.toastService.success(title, message);
    // }
  }

  toastMandatoryAlert() {
    this.toast('Enter mandatory fields');
    // this.toastService.warning('Enter mandatory fields');
  }

  /**
    * Shows sweet toast on top right corner of the page
    * But this doesn't looks good for mobile devices, so for mobile we show as regular toast
    *
    * @param message Text to show as toast
    * @param timeout Time duration of the toast
    */
  toast(message: string) {
    const toastMessage = message ? message : '';
    const duration = 1500;

    const Toast = Swal.mixin({
      toast: true,
      // background: '#b3d6ba',
      // background: '#ffffff',
      position: 'top',
      showConfirmButton: false,
      timer: duration,
      timerProgressBar: false,
      // onOpen: (toast) => {
      //   toast.addEventListener('mouseenter', Swal.stopTimer);
      //   toast.addEventListener('mouseleave', Swal.resumeTimer);
      // }
    });

    Toast.fire({
      icon: 'warning',
      title: toastMessage
    });

  }


  /**
   * Shows a sweet alert with title and text. Then we can use optional navigate option
   * if required.
   *
   * @param message Alert title message
   * @param content Content text of the alert
   * @param confirmText Confirm button text to display
   */
  alertWithResponse(titleMessage: string, content?: string, confirmText?: string, cancelText?: string): Promise<any> {
    const confirmButtonText = confirmText || 'Confirm';
    const cancelButtonText = cancelText || 'Cancel';
    var promise = new Promise((resolve, reject) => {
      Swal.fire({
        title: titleMessage,
        text: content || '',
        icon: 'question',
        heightAuto: false,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        focusConfirm: false,
        focusCancel: true
      }).then((value) => {
        resolve(value);
      });
    });
    return promise;
  }

}
