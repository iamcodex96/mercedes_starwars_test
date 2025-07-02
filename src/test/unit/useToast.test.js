import { describe, it, expect, beforeEach } from 'vitest'
import { useToast, toast } from '@/application/composables/useToast.js'

describe('useToast composable', () => {
  let toastInstance;

  beforeEach(() => {
    toast.hideToast();
    toastInstance = useToast();
  });

  describe('Initial state', () => {
    it('should have correct initial state', () => {
      expect(toastInstance.toastState.show).toBe(false);
      expect(toastInstance.toastState.type).toBe('info');
      expect(toastInstance.toastState.title).toBe('');
      expect(toastInstance.toastState.message).toBe('');
      expect(toastInstance.toastState.timeout).toBe(5000);
      expect(toastInstance.toastState.persistent).toBe(false);
    });
  });

  describe('showToast method', () => {
    it('should show toast with basic options', () => {
      toastInstance.showToast({
        type: 'success',
        title: 'Test Title',
        message: 'Test Message'
      });

      expect(toastInstance.toastState.show).toBe(true);
      expect(toastInstance.toastState.type).toBe('success');
      expect(toastInstance.toastState.title).toBe('Test Title');
      expect(toastInstance.toastState.message).toBe('Test Message');
      expect(toastInstance.toastState.timeout).toBe(4000);
    });

    it('should use default values when options are not provided', () => {
      toastInstance.showToast({
        message: 'Only message provided',
      });

      expect(toastInstance.toastState.show).toBe(true);
      expect(toastInstance.toastState.type).toBe('info');
      expect(toastInstance.toastState.title).toBe('');
      expect(toastInstance.toastState.message).toBe('Only message provided');
      expect(toastInstance.toastState.timeout).toBe(4000);
      expect(toastInstance.toastState.persistent).toBe(false);
    });

    it('should set persistent toast correctly', () => {
      toastInstance.showToast({
        message: 'Persistent message',
        persistent: true,
      });

      expect(toastInstance.toastState.persistent).toBe(true);
    });

    it('should override timeout when provided', () => {
      toastInstance.showToast({
        type: 'success',
        message: 'Custom timeout',
        timeout: 8000,
      });

      expect(toastInstance.toastState.timeout).toBe(8000);
    });

    it('should reset show state before setting new toast', () => {
      toastInstance.showToast({
        message: 'First toast',
      });
      expect(toastInstance.toastState.show).toBe(true);

      toastInstance.showToast({
        message: 'Second toast',
      })
      expect(toastInstance.toastState.show).toBe(true);
      expect(toastInstance.toastState.message).toBe('Second toast');
    });
  });

  describe('hideToast method', () => {
    it('should hide the toast', () => {
      toastInstance.showToast({
        message: 'Test message',
      });
      expect(toastInstance.toastState.show).toBe(true);

      toastInstance.hideToast();
      expect(toastInstance.toastState.show).toBe(false);
    });
  });

  describe('showSuccess method', () => {
    it('should show success toast with default title', () => {
      toastInstance.showSuccess('Operation completed successfully');

      expect(toastInstance.toastState.show).toBe(true);
      expect(toastInstance.toastState.type).toBe('success');
      expect(toastInstance.toastState.title).toBe('Success');
      expect(toastInstance.toastState.message).toBe('Operation completed successfully');
    });

    it('should allow custom title in options', () => {
      toastInstance.showSuccess('Data saved', { title: 'Custom Success' });

      expect(toastInstance.toastState.title).toBe('Custom Success');
      expect(toastInstance.toastState.message).toBe('Data saved');
    });

    it('should allow additional options', () => {
      toastInstance.showSuccess('Success message', { 
        timeout: 3000,
        persistent: true,
      });

      expect(toastInstance.toastState.timeout).toBe(3000);
      expect(toastInstance.toastState.persistent).toBe(true);
    });
  });

  describe('showError method', () => {
    it('should show error toast with default title and timeout', () => {
      toastInstance.showError('Something went wrong');

      expect(toastInstance.toastState.show).toBe(true);
      expect(toastInstance.toastState.type).toBe('error');
      expect(toastInstance.toastState.title).toBe('Error');
      expect(toastInstance.toastState.message).toBe('Something went wrong');
      expect(toastInstance.toastState.timeout).toBe(6000);
    });

    it('should allow custom title in options', () => {
      toastInstance.showError('Failed to load data', { title: 'Load Error' })

      expect(toastInstance.toastState.title).toBe('Load Error')
    });
  });

  describe('showWarning method', () => {
    it('should show warning toast with default title', () => {
      toastInstance.showWarning('This action cannot be undone')

      expect(toastInstance.toastState.show).toBe(true)
      expect(toastInstance.toastState.type).toBe('warning')
      expect(toastInstance.toastState.title).toBe('Warning')
      expect(toastInstance.toastState.message).toBe('This action cannot be undone')
    });

    it('should allow custom title in options', () => {
      toastInstance.showWarning('Check your input', { title: 'Validation Warning' })

      expect(toastInstance.toastState.title).toBe('Validation Warning')
    });
  });

  describe('showInfo method', () => {
    it('should show info toast with default title', () => {
      toastInstance.showInfo('Data has been updated')

      expect(toastInstance.toastState.show).toBe(true);
      expect(toastInstance.toastState.type).toBe('info');
      expect(toastInstance.toastState.title).toBe('Info');
      expect(toastInstance.toastState.message).toBe('Data has been updated');
    });

    it('should allow custom title in options', () => {
      toastInstance.showInfo('New features available', { title: 'Information' });

      expect(toastInstance.toastState.title).toBe('Information');
    });
  });

  describe('showLoading method', () => {
    it('should show loading toast with default message', () => {
      toastInstance.showLoading();

      expect(toastInstance.toastState.show).toBe(true);
      expect(toastInstance.toastState.type).toBe('info');
      expect(toastInstance.toastState.title).toBe('');
      expect(toastInstance.toastState.message).toBe('Loading data...');
      expect(toastInstance.toastState.persistent).toBe(true);
    });

    it('should show loading toast with custom message', () => {
      toastInstance.showLoading('Saving your changes...');

      expect(toastInstance.toastState.message).toBe('Saving your changes...');
      expect(toastInstance.toastState.persistent).toBe(true);
    });
  });

  describe('Default timeout function', () => {
    it('should return correct timeout for each toast type', () => {
      toastInstance.showToast({ type: 'success', message: 'test' });
      expect(toastInstance.toastState.timeout).toBe(4000)

      toastInstance.showToast({ type: 'error', message: 'test' });
      expect(toastInstance.toastState.timeout).toBe(6000);

      toastInstance.showToast({ type: 'warning', message: 'test' });
      expect(toastInstance.toastState.timeout).toBe(5000)

      toastInstance.showToast({ type: 'info', message: 'test' });
      expect(toastInstance.toastState.timeout).toBe(4000);
    })

    it('should return default timeout for unknown type', () => {
      toastInstance.showToast({ type: 'unknown', message: 'test' });
      expect(toastInstance.toastState.timeout).toBe(4000);
    })
  })

  describe('Singleton toast instance', () => {
    it('should share state between different toast instances', () => {
      const toast1 = useToast();
      const toast2 = useToast();

      toast1.showSuccess('Test message');
      
      expect(toast2.toastState.show).toBe(true)
      expect(toast2.toastState.message).toBe('Test message');
      expect(toast2.toastState.type).toBe('success');
    })

    it('should allow hiding from different instance', () => {
      const toast1 = useToast();
      const toast2 = useToast();

      toast1.showInfo('Test message');
      expect(toast1.toastState.show).toBe(true);

      toast2.hideToast();
      expect(toast1.toastState.show).toBe(false);
    });
  });

  describe('State reactivity', () => {
    it('should maintain reactivity when state changes', () => {
      const initialShow = toastInstance.toastState.show;
      
      toastInstance.showInfo('Test reactivity');
      
      expect(toastInstance.toastState.show).not.toBe(initialShow);
      expect(toastInstance.toastState.show).toBe(true);
    });
  });
});

describe('Exported toast singleton', () => {
  beforeEach(() => {
    toast.hideToast();
  })

  it('should be available as singleton export', () => {
    expect(toast).toBeDefined();
    expect(typeof toast.showSuccess).toBe('function');
    expect(typeof toast.showError).toBe('function');
    expect(typeof toast.showWarning).toBe('function');
    expect(typeof toast.showInfo).toBe('function');
    expect(typeof toast.showLoading).toBe('function');
    expect(typeof toast.hideToast).toBe('function');
  });

  it('should work with singleton instance', () => {
    toast.showSuccess('Singleton test');
    
    expect(toast.toastState.show).toBe(true);
    expect(toast.toastState.type).toBe('success');
    expect(toast.toastState.message).toBe('Singleton test');
  });

  it('should maintain state across imports', () => {
    toast.showWarning('State persistence test');
    
    const newToastInstance = useToast();
    
    expect(newToastInstance.toastState.show).toBe(true);
    expect(newToastInstance.toastState.type).toBe('warning');
    expect(newToastInstance.toastState.message).toBe('State persistence test');
  });
});