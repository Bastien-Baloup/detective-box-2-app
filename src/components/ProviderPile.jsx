import PropTypes from "prop-types";
import {
  BoxProvider,
  AuthProvider,
  AmbianceProvider,
  DataProvider,
  EventProvider,
  CompteProvider, 
  ErrorProvider
} from "../utils/context/fetchContext.jsx";

const ProviderPile = ({ children }) => {
  return (
    <ErrorProvider>
      <BoxProvider>
        <AuthProvider>
          <AmbianceProvider>
            <DataProvider>
              <EventProvider>
                <CompteProvider>
                  {children}
                </CompteProvider>
              </EventProvider>
            </DataProvider>
          </AmbianceProvider>
        </AuthProvider>
      </BoxProvider>
    </ErrorProvider>
  )
}

ProviderPile.propTypes = {
	children: PropTypes.any,
};

export default ProviderPile