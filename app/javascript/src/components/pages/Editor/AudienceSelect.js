import React, { useEffect } from "react";
import { Get } from "react-axios";

// hooks
import useCheckboxes from "#hooks/useCheckboxes";

// API
import { updateGuide } from "#api/internal/guide";

const AudienceSelect = ({ guide }) => {
  const [audiences, dispatchAudiences] = useCheckboxes(
    guide.data.attributes.audience_ids
  );

  useEffect(() => {
    updateGuide(guide.data.id, {
      audience_ids: audiences.map((a) => parseInt(a)),
    });
  }, [audiences]);

  return (
    <Get url="/audiences">
      {(error, response, isLoading) => {
        if (response) {
          return (
            <fieldset>
              <legend>This guide to records will be most helpful for:</legend>

              {response.data.data.map((audience) => (
                <div key={audience.id}>
                  <input
                    type="checkbox"
                    id={`audience-${audience.id}`}
                    name="audiences"
                    defaultChecked={guide.data.attributes.audience_ids.includes(
                      parseInt(audience.id)
                    )}
                    value={audience.id}
                    onChange={(event) =>
                      dispatchAudiences({
                        type: event.target.checked ? "add" : "remove",
                        value: parseInt(event.target.value),
                      })
                    }
                  />
                  <label htmlFor={`audience-${audience.id}`}>
                    {audience.attributes.name}
                  </label>
                </div>
              ))}
            </fieldset>
          );
        }

        return null;
      }}
    </Get>
  );
};

export default AudienceSelect;
