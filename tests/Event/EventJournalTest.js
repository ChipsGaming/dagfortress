var assert = require('assert'),
  Event = require('../../src/Event/Event'),
  EventJournal = require('../../src/Event/EventJournal');

describe('has', () => {
  it('Should return true, if event triggered', () => {
    const event = new Event('foo'),
      journal = new EventJournal;

    assert.equal(false, journal.has(event));

    journal.trigger(event);

    assert.equal(true, journal.has(event));
  });
});

describe('findByName', () => {
  it('Should return all events with target name', () => {
    const journal = new EventJournal;

    journal.trigger('foo');
    journal.trigger('foo');
    journal.trigger('bar');

    const events = journal.findByName('foo');

    assert.equal(2, events.length);
  });
});

describe('findByPublisher', () => {
  it('Should return all events with target publisher', () => {
    const publisherA = {},
      publisherB = {},
      journal = new EventJournal;

    journal.trigger('foo', publisherA);
    journal.trigger('bar', publisherA);
    journal.trigger('bar', publisherB);

    const events = journal.findByPublisher(publisherA);

    assert.equal(2, events.length);
  });
});

describe('trigger', () => {
  it('Should register event', () => {
    const journal = new EventJournal;

    assert.equal(0, journal.events.length);

    journal.trigger('foo');

    assert.equal(1, journal.events.length);

    journal.trigger('foo');

    assert.equal(2, journal.events.length);
  });
});

describe('merge', () => {
  it('Should register all events of target journal', () => {
    const journalA = new EventJournal,
      journalB = new EventJournal,
      fooEvent = new Event('foo'),
      barEvent = new Event('bar');

    journalA.trigger(fooEvent);
    journalB.trigger(barEvent);

    assert.equal(true, journalA.has(fooEvent));
    assert.equal(false, journalA.has(barEvent));

    journalA.merge(journalB);

    assert.equal(true, journalA.has(fooEvent));
    assert.equal(true, journalA.has(barEvent));
  });
});

describe('clear', () => {
  it('Should clear journal', () => {
    const journal = new EventJournal;
    journal.trigger('foo');

    assert.equal(1, journal.events.length);

    journal.clear();

    assert.equal(0, journal.events.length);
  });
});
