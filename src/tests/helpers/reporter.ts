import {
  DisplayProcessor,
  SpecReporter,
  StacktraceOption
} from 'jasmine-spec-reporter';
import SuiteInfo = jasmine.SuiteResult;
class CustomProcessor extends DisplayProcessor {
  public displayJasmineStarted(_info: SuiteInfo, log: string): string {
    return '${log}';
  }
}
jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
  new SpecReporter({
    suite: {
      displayNumber: true
    },
    spec: {
      displayStacktrace: StacktraceOption.NONE
      //displayPending: true,
    },
    customProcessors: [CustomProcessor]
  }) as jasmine.CustomReporter
);
