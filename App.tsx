import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import Logo from './assets/lonestar-handyman.svg';

const PHONE = '+16825589208';
const PHONE_DISPLAY = '(682) 558-9208';

const SERVICES = [
  { icon: 'water-outline' as const,         title: 'Plumbing',       desc: 'Leak repairs, fixture installs & pipe work' },
  { icon: 'flash-outline' as const,         title: 'Electrical',     desc: 'Outlets, switches & light fixtures' },
  { icon: 'hammer-outline' as const,        title: 'Carpentry',      desc: 'Trim, doors & custom woodwork' },
  { icon: 'color-palette-outline' as const, title: 'Painting',       desc: 'Interior & exterior painting' },
  { icon: 'construct-outline' as const,     title: 'Drywall',        desc: 'Patching, repair & installation' },
  { icon: 'grid-outline' as const,          title: 'Flooring',       desc: 'Tile, hardwood & vinyl plank' },
  { icon: 'home-outline' as const,          title: 'Deck & Fence',   desc: 'Repair, building & staining' },
  { icon: 'settings-outline' as const,      title: 'Appliances',     desc: 'Dishwashers, disposals & more' },
];

const WHY_US = [
  { icon: 'shield-checkmark-outline' as const, text: 'Licensed & Insured' },
  { icon: 'time-outline' as const,             text: 'On-Time, Every Time' },
  { icon: 'star-outline' as const,             text: '5-Star Rated Service' },
  { icon: 'pricetag-outline' as const,         text: 'Fair, Transparent Pricing' },
];

function QuoteModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      quality: 0.8,
    });
    if (!result.canceled) {
      setPhotos(prev => [...prev, ...result.assets]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    setPhotos([]);
    setSubmitting(false);
    setSubmitted(false);
    onClose();
  };

  const canSubmit = name.trim().length > 0 && description.trim().length > 0;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
      <StatusBar style="dark" />
      <ScrollView style={styles.modalScroll} contentContainerStyle={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Start a Quote</Text>
          <TouchableOpacity onPress={handleClose} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
            <Ionicons name="close" size={28} color="#0C2A5D" />
          </TouchableOpacity>
        </View>

        {submitted ? (
          <View style={styles.successContainer}>
            <Ionicons name="checkmark-circle" size={80} color="#22c55e" />
            <Text style={styles.successTitle}>Quote Submitted!</Text>
            <Text style={styles.successText}>
              We'll review your project and get back to you within 24 hours.
            </Text>
            <TouchableOpacity style={[styles.ctaButton, { marginTop: 36 }]} onPress={handleClose} activeOpacity={0.8}>
              <Text style={styles.ctaButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.fieldLabel}>Your Name *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="John Smith"
              placeholderTextColor="#aaa"
              autoCapitalize="words"
            />

            <Text style={styles.fieldLabel}>Describe Your Project *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Tell us what needs to be done, your location, and any helpful details..."
              placeholderTextColor="#aaa"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />

            <Text style={styles.fieldLabel}>Photos (optional)</Text>
            <TouchableOpacity style={styles.photoPickerButton} onPress={pickImages} activeOpacity={0.7}>
              <Ionicons name="images-outline" size={22} color="#0C2A5D" />
              <Text style={styles.photoPickerText}>Add Photos from Library</Text>
            </TouchableOpacity>

            {photos.length > 0 && (
              <View style={styles.photoGrid}>
                {photos.map((photo, i) => (
                  <View key={i} style={styles.photoThumbWrapper}>
                    <Image source={{ uri: photo.uri }} style={styles.photoThumb} />
                    <TouchableOpacity style={styles.photoRemove} onPress={() => removePhoto(i)}>
                      <Ionicons name="close-circle" size={22} color="#CA0720" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            <TouchableOpacity
              style={[styles.ctaButton, { marginTop: 32 }, !canSubmit && styles.ctaButtonDisabled]}
              onPress={handleSubmit}
              disabled={submitting || !canSubmit}
              activeOpacity={0.8}
            >
              {submitting
                ? <ActivityIndicator color="#fff" size="small" />
                : <Text style={styles.ctaButtonText}>Submit Quote Request</Text>
              }
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </Modal>
  );
}

export default function App() {
  const [quoteVisible, setQuoteVisible] = useState(false);

  return (
    <>
      <StatusBar style="light" />
      <ScrollView style={styles.root} contentContainerStyle={styles.rootContent}>

        {/* ── HEADER ── */}
        <View style={styles.header}>
          <Logo width={140} height={56} />
          <TouchableOpacity
            style={styles.headerCallBtn}
            onPress={() => Linking.openURL(`tel:${PHONE}`)}
            activeOpacity={0.8}
          >
            <Ionicons name="call" size={15} color="#fff" />
            <Text style={styles.headerCallText}>{PHONE_DISPLAY}</Text>
          </TouchableOpacity>
        </View>

        {/* ── HERO ── */}
        <View style={styles.hero}>
          <Text style={styles.heroTagline}>Trusted Local Handyman Services</Text>
          <Text style={styles.heroSub}>
            From small repairs to big projects — Lonestar Handyman gets it done right, on time, and on budget.
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.ctaButton} onPress={() => setQuoteVisible(true)} activeOpacity={0.8}>
              <Ionicons name="clipboard" size={20} color="#fff" style={styles.btnIcon} />
              <Text style={styles.ctaButtonText}>Start a Quote</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.callButton} onPress={() => Linking.openURL(`tel:${PHONE}`)} activeOpacity={0.8}>
              <Ionicons name="call" size={20} color="#0C2A5D" style={styles.btnIcon} />
              <Text style={styles.callButtonText}>Call Us</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── WHY CHOOSE US ── */}
        <View style={styles.whySection}>
          {WHY_US.map((item, i) => (
            <View key={i} style={styles.whyItem}>
              <View style={styles.whyIconWrap}>
                <Ionicons name={item.icon} size={26} color="#CA0720" />
              </View>
              <Text style={styles.whyText}>{item.text}</Text>
            </View>
          ))}
        </View>

        {/* ── SERVICES ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>What We Do</Text>
          <Text style={styles.sectionTitle}>Our Services</Text>
          <View style={styles.servicesGrid}>
            {SERVICES.map((s, i) => (
              <View key={i} style={styles.serviceCard}>
                <View style={styles.serviceIconWrap}>
                  <Ionicons name={s.icon} size={32} color="#0C2A5D" />
                </View>
                <Text style={styles.serviceTitle}>{s.title}</Text>
                <Text style={styles.serviceDesc}>{s.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── ABOUT ── */}
        <View style={[styles.section, styles.aboutSection]}>
          <Text style={[styles.sectionLabel, styles.sectionLabelLight]}>About Us</Text>
          <Text style={[styles.sectionTitle, styles.sectionTitleLight]}>Local. Reliable. Professional.</Text>
          <Text style={styles.aboutText}>
            Lonestar Handyman has been proudly serving the Dallas-Fort Worth area with honest, high-quality craftsmanship. We're your neighbors — we take pride in our work and stand behind every job we complete.
          </Text>
          <Text style={[styles.aboutText, { marginTop: 14 }]}>
            No project is too small. Whether it's a leaky faucet, a fresh coat of paint, or a full deck build, we bring the same level of care and professionalism to every call.
          </Text>
        </View>

        {/* ── BOTTOM CTA ── */}
        <View style={styles.ctaBanner}>
          <Text style={styles.ctaBannerTitle}>Ready to get started?</Text>
          <Text style={styles.ctaBannerSub}>
            Request a free quote or give us a call — we respond fast.
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.ctaButton} onPress={() => setQuoteVisible(true)} activeOpacity={0.8}>
              <Ionicons name="clipboard" size={20} color="#fff" style={styles.btnIcon} />
              <Text style={styles.ctaButtonText}>Start a Quote</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.callButton} onPress={() => Linking.openURL(`tel:${PHONE}`)} activeOpacity={0.8}>
              <Ionicons name="call" size={20} color="#0C2A5D" style={styles.btnIcon} />
              <Text style={styles.callButtonText}>Call Us</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── FOOTER ── */}
        <View style={styles.footer}>
          <Logo width={110} height={46} />
          <Text style={styles.footerLocation}>Serving the Dallas-Fort Worth Metroplex</Text>
          <TouchableOpacity onPress={() => Linking.openURL(`tel:${PHONE}`)}>
            <Text style={styles.footerPhone}>{PHONE_DISPLAY}</Text>
          </TouchableOpacity>
          <Text style={styles.footerCopy}>
            © {new Date().getFullYear()} Lonestar Handyman. All rights reserved.
          </Text>
        </View>

      </ScrollView>

      <QuoteModal visible={quoteVisible} onClose={() => setQuoteVisible(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  rootContent: {},

  // HEADER
  header: {
    backgroundColor: '#0C2A5D',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 52 : 16,
    paddingBottom: 14,
  },
  headerCallBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#CA0720',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },
  headerCallText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },

  // HERO
  hero: {
    backgroundColor: '#0C2A5D',
    paddingHorizontal: 28,
    paddingTop: 48,
    paddingBottom: 72,
    alignItems: 'center',
  },
  heroTagline: {
    fontSize: 34,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 42,
    marginBottom: 18,
    maxWidth: 480,
  },
  heroSub: {
    fontSize: 17,
    color: '#b8cce4',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 40,
    maxWidth: 420,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  btnIcon: {
    marginRight: 8,
  },

  // BUTTONS
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CA0720',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 26,
    minWidth: 180,
  },
  ctaButtonDisabled: {
    backgroundColor: '#e8a0a8',
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 26,
    minWidth: 160,
  },
  callButtonText: {
    color: '#0C2A5D',
    fontSize: 17,
    fontWeight: '700',
  },

  // WHY US
  whySection: {
    backgroundColor: '#f5f7fb',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 28,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  whyItem: {
    alignItems: 'center',
    minWidth: 120,
    maxWidth: 150,
  },
  whyIconWrap: {
    backgroundColor: '#fff',
    borderRadius: 40,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  whyText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
    lineHeight: 20,
  },

  // SECTIONS
  section: {
    paddingVertical: 60,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    color: '#CA0720',
    marginBottom: 10,
  },
  sectionLabelLight: {
    color: '#e87a8a',
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#0C2A5D',
    textAlign: 'center',
    marginBottom: 40,
  },
  sectionTitleLight: {
    color: '#fff',
  },

  // SERVICES GRID
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    maxWidth: 960,
    width: '100%',
  },
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 26,
    alignItems: 'center',
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  serviceIconWrap: {
    backgroundColor: '#eef2f9',
    borderRadius: 40,
    width: 68,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0C2A5D',
    marginBottom: 6,
    textAlign: 'center',
  },
  serviceDesc: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    lineHeight: 19,
  },

  // ABOUT
  aboutSection: {
    backgroundColor: '#0C2A5D',
  },
  aboutText: {
    fontSize: 16,
    color: '#b8cce4',
    lineHeight: 28,
    textAlign: 'center',
    maxWidth: 620,
  },

  // CTA BANNER
  ctaBanner: {
    backgroundColor: '#f5f7fb',
    paddingVertical: 60,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  ctaBannerTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#0C2A5D',
    textAlign: 'center',
    marginBottom: 12,
  },
  ctaBannerSub: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 36,
    maxWidth: 380,
  },

  // FOOTER
  footer: {
    backgroundColor: '#091d40',
    paddingVertical: 44,
    paddingHorizontal: 24,
    alignItems: 'center',
    gap: 12,
  },
  footerLocation: {
    color: '#7a96be',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
  },
  footerPhone: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  footerCopy: {
    color: '#3d5878',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },

  // MODAL
  modalScroll: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContent: {
    padding: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 28,
    paddingBottom: 48,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0C2A5D',
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 22,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#dde2ec',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 16,
    color: '#1a1a1a',
    backgroundColor: '#fafbfc',
  },
  textArea: {
    height: 150,
    paddingTop: 13,
  },
  photoPickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1.5,
    borderColor: '#0C2A5D',
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  photoPickerText: {
    color: '#0C2A5D',
    fontSize: 15,
    fontWeight: '600',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 16,
  },
  photoThumbWrapper: {
    position: 'relative',
  },
  photoThumb: {
    width: 88,
    height: 88,
    borderRadius: 8,
  },
  photoRemove: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#fff',
    borderRadius: 12,
  },

  // SUCCESS
  successContainer: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0C2A5D',
    marginTop: 22,
    marginBottom: 14,
    textAlign: 'center',
  },
  successText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: 320,
  },
});
