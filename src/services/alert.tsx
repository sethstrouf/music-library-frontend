import React from 'react'
import { toast } from 'react-toastify'

class AlertService {
  showSuccess(title: string, content = '') {
    toast.success(<div dangerouslySetInnerHTML={{ __html : title + '<br/>' + content }}></div>);
  }

  showError(title: string, content = '') {
    toast.error(<div dangerouslySetInnerHTML={{ __html : title + '<br/>' + content }}></div>);
  }
}

export const alertService = new AlertService();
