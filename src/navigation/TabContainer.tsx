import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Assemble from '../screens/Assemble';
import Lines from '../screens/Lines';
import World from '../screens/World';

const Tab = createBottomTabNavigator();

const TabContainer = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Assemble" component={Assemble} />
      <Tab.Screen name="World" component={World} />
      <Tab.Screen name="Lines" component={Lines} />
    </Tab.Navigator>
  );
}

export default TabContainer;