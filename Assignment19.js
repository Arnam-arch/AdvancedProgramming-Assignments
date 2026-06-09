import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const THEMES = {
  light: {
    background: '#F8F7F4',
    surface: '#FFFFFF',
    text: '#1A1A1A',
    subText: '#1A1A1A88',
    border: '#1A1A1A22',
    incBg: '#1A1A1A',
    incText: '#F5F4F0',
    decBg: 'transparent',
    decText: '#1A1A1A',
    decBorder: '#1A1A1A40',
    resetBorder: '#1A1A1A55',
    resetText: '#1A1A1A',
    themeBg: '#F0EDE8',
    themeText: '#1A1A1A',
    themeBorder: '#1A1A1A22',
    statusBar: 'dark-content',
  },
  dark: {
    background: '#1A1A1A',
    surface: '#2A2A2A',
    text: '#F5F4F0',
    subText: '#F5F4F088',
    border: '#FFFFFF22',
    incBg: '#F5F4F0',
    incText: '#1A1A1A',
    decBg: 'transparent',
    decText: '#F5F4F0',
    decBorder: '#F5F4F040',
    resetBorder: '#F5F4F055',
    resetText: '#F5F4F0',
    themeBg: '#2A2A2A',
    themeText: '#F5F4F0',
    themeBorder: '#FFFFFF22',
    statusBar: 'light-content',
  },
};

export default function App() {
  const [count, setCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = isDarkMode ? THEMES.dark : THEMES.light;

  const handleIncrement = () => setCount(prev => prev + 1);

  const handleDecrement = () => {
    if (count > 0) setCount(prev => prev - 1);
  };

  const handleReset = () => setCount(0);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.statusBar} backgroundColor={theme.background} />

      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.appTitle, { color: theme.subText }]}>
          COUNTER APP
        </Text>

        <View style={styles.counterSection}>
          <Text style={[styles.counterLabel, { color: theme.subText }]}>
            CURRENT COUNT
          </Text>

          <View
            style={[
              styles.counterRing,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <Text style={[styles.counterNum, { color: theme.text }]}>
              {count}
            </Text>
          </View>

          <View style={styles.btnRow}>
            <TouchableOpacity
              style={[
                styles.btn,
                {
                  backgroundColor: theme.decBg,
                  borderColor: theme.decBorder,
                  opacity: count === 0 ? 0.3 : 1,
                },
              ]}
              onPress={handleDecrement}
              disabled={count === 0}
              activeOpacity={0.7}
            >
              <Text style={[styles.btnText, { color: theme.decText }]}>
                − Dec
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.btn,
                { backgroundColor: theme.incBg, borderColor: theme.incBg },
              ]}
              onPress={handleIncrement}
              activeOpacity={0.8}
            >
              <Text style={[styles.btnText, { color: theme.incText }]}>
                Inc +
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomControls}>
          <TouchableOpacity
            style={[styles.resetBtn, { borderColor: theme.resetBorder }]}
            onPress={handleReset}
            activeOpacity={0.6}
          >
            <Text style={[styles.resetText, { color: theme.resetText }]}>
              Reset to 0
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.themeBtn,
              { backgroundColor: theme.themeBg, borderColor: theme.themeBorder },
            ]}
            onPress={toggleTheme}
            activeOpacity={0.8}
          >
            <Text style={[styles.themeBtnText, { color: theme.themeText }]}>
              {isDarkMode
                ? '☀️  Switch to Light Mode'
                : '🌙  Switch to Dark Mode'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    paddingTop: 24,
    paddingBottom: 36,
  },

  appTitle: {
    fontSize: 11,
    letterSpacing: 3,
    fontWeight: '600',
    marginBottom: 8,
  },

  counterSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  counterLabel: {
    fontSize: 11,
    letterSpacing: 3.5,
    fontWeight: '500',
    marginBottom: 20,
  },

  counterRing: {
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterNum: {
    fontFamily: 'Courier New',
    fontSize: 72,
    fontWeight: '700',
    lineHeight: 80,
  },

  btnRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 36,
    width: '100%',
    justifyContent: 'center',
  },
  btn: {
    flex: 1,
    maxWidth: 130,
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
  },

  bottomControls: {
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  resetBtn: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 32,
  },
  resetText: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 1,
    opacity: 0.6,
  },
  themeBtn: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeBtnText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});