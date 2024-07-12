const DashboardPage = () => {
  return (
    <>
      <div>
        <p>Dashboard</p>
        <div>
          <p>
            &bull; Try the Figma present function (play button on top right) to
            run a click dummy. Try to walk all paths
          </p>
          <p>here, there are 2 examples of autocomplete.</p>
          <p>&bull; Use React + any web technologies of your choice.</p>
          <p>&bull; Put under version control.</p>
          <p>&bull; Push it as far as you can in a reasonable time frame.</p>
          <p>
            &bull; No need to connect to an API, just produce a JSON at the end
            of the flow when hitting the upload
          </p>
          <p>
            button. Come up with a reasonable JSON structure for persistence.
          </p>
          <p>
            &bull; If you have any questions related to the challenge
            don&rsquo;t hesitate to contact Lars (
            <a data-fr-linked="true" href="mailto:l.diehl@jdm.de">
              l.diehl@jdm.de
            </a>
            ).
          </p>
          <p>Further info</p>
          <p>
            &bull; Hitting the arrow buttons shifts the plan by a week (or less
            if there aren&rsquo;t 7 days left).
          </p>
          <p>&bull; Scrollbar is not interactive (see Bonus Points).</p>
          <p>&bull; Start and End Date showcase a calendar picker.</p>
          <p>&bull; &ldquo;Autocomplete&rdquo; only works once.</p>
          <p>
            &bull; &ldquo;Reset&rdquo; resets times, but not Start/End Date and
            refreshes the Autocomplete function.
          </p>
          <p>
            &bull; &ldquo;Upload&rdquo; is disabled until all days have at least
            one time added.
          </p>
          <p>
            &bull; Changing the End Date will result in a longer or shorter
            period, with days being added or deleted
          </p>
          <p>accordingly.</p>
          <p>
            &bull; Changing the Start Date does not add/delete any days and the
            period (e.g. 14 days) stays the same,
          </p>
          <p>
            effectively just shifting the end date and updating the day labels.
            The plan for the &ldquo;first day&rdquo; will still be
          </p>
          <p>the same (just with a different date).</p>
          <p>Bonus Points</p>
          <p>
            &bull; Hitting Return in a Time input field creates a new Time below
            and shifts the focus there.
          </p>
          <p>
            &bull; Creating times in an unsorted order (09:00, 08:00) shows a
            hint and disables the upload button.
          </p>
          <p>
            &bull; Make horizontal scrollbar interactive: Scroll by days/columns
            rather than smoothly (like in a table)
          </p>
          <p>Other hints</p>
          <p>
            &bull; Complete the challenge as far as possible. It&apos;s not
            required to cover all points. In this case provide a list
          </p>
          <p>of completed and missing points</p>
          <p>&bull; Please deploy your solution for demonstration</p>
          <p>Have fun! We are looking forward to your results!</p>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
