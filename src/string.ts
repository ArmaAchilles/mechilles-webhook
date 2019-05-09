import * as _ from 'lodash';

export default class String {
    public static shorten(text: string, length: number): string {
        return _.truncate(text, { length, omission: '' });
    }

    public static toSentenceCase(text: string): string {
        return _.startCase(text);
    }
}
