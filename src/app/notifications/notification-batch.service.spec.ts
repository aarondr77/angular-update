import { TestBed } from '@angular/core/testing';
import { NotificationBatchService } from './notification-batch.service';

/**
 * Characterization tests — pins current behavior of the C3 timing-sensitive specimen
 * before Angular 14→15 upgrade. Covers handler/render counter semantics and
 * rapid-toggle processing.
 */
describe('NotificationBatchService (characterization)', () => {
  let service: NotificationBatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationBatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initialization', () => {
    it('starts uninitialized', () => {
      expect(service.isInitialized()).toBe(false);
    });

    it('becomes initialized after registerDefaults()', () => {
      service.registerDefaults();
      expect(service.isInitialized()).toBe(true);
    });
  });

  describe('getDefaultPreferences', () => {
    it('returns exactly 4 default preferences', () => {
      const prefs = service.getDefaultPreferences();
      expect(prefs).toHaveLength(4);
    });

    it('returns preferences with correct structure', () => {
      const prefs = service.getDefaultPreferences();
      prefs.forEach((p) => {
        expect(p).toHaveProperty('id');
        expect(p).toHaveProperty('label');
        expect(p).toHaveProperty('enabled');
        expect(p).toHaveProperty('category');
      });
    });

    it('has email-statements enabled by default', () => {
      const prefs = service.getDefaultPreferences();
      const emailStatements = prefs.find((p) => p.id === 'email-statements');
      expect(emailStatements?.enabled).toBe(true);
    });

    it('has email-marketing disabled by default', () => {
      const prefs = service.getDefaultPreferences();
      const marketing = prefs.find((p) => p.id === 'email-marketing');
      expect(marketing?.enabled).toBe(false);
    });
  });

  describe('counter semantics', () => {
    it('starts handler invocation count at 0', () => {
      expect(service.getHandlerInvocationCount()).toBe(0);
    });

    it('starts render cycle count at 0', () => {
      expect(service.getRenderCycleCount()).toBe(0);
    });

    it('increments handler invocation count', () => {
      service.recordHandlerInvocation();
      service.recordHandlerInvocation();
      expect(service.getHandlerInvocationCount()).toBe(2);
    });

    it('increments render cycle count and returns new value', () => {
      const first = service.recordRenderCycle();
      const second = service.recordRenderCycle();
      expect(first).toBe(1);
      expect(second).toBe(2);
      expect(service.getRenderCycleCount()).toBe(2);
    });

    it('resets both counters to 0', () => {
      service.recordHandlerInvocation();
      service.recordRenderCycle();
      service.resetCounters();
      expect(service.getHandlerInvocationCount()).toBe(0);
      expect(service.getRenderCycleCount()).toBe(0);
    });
  });

  describe('processRapidToggle', () => {
    it('records a handler invocation on each call', () => {
      service.processRapidToggle(true);
      service.processRapidToggle(false);
      expect(service.getHandlerInvocationCount()).toBe(2);
    });

    it('returns the enabled value passed in', () => {
      expect(service.processRapidToggle(true)).toBe(true);
      expect(service.processRapidToggle(false)).toBe(false);
    });
  });
});
