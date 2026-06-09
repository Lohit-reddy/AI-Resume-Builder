import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link, Image } from '@react-pdf/renderer';

export default function PDFDocument({ resumeData = {}, color = '#3b82f6' }) {
  const {
    personalInfo = {},
    summary = '',
    experience = [],
    education = [],
    skills = [],
    projects = [],
  } = resumeData;

  const {
    name = '',
    email = '',
    phone = '',
    location = '',
    linkedin = '',
    github = '',
    website = '',
    profileImage = '',
  } = personalInfo;

  const styles = StyleSheet.create({
    page: {
      padding: 40,
      backgroundColor: '#FFFFFF',
      fontFamily: 'Helvetica',
      fontSize: 10,
      color: '#334155',
    },
    header: {
      borderBottomWidth: 1.5,
      borderBottomColor: color,
      paddingBottom: 12,
      marginBottom: 16,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: color,
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: 6,
    },
    contactRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      fontSize: 8,
      color: '#64748B',
    },
    section: {
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: color,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      marginBottom: 4,
      marginTop: 8,
    },
    sectionDivider: {
      height: 1,
      backgroundColor: '#E2E8F0',
      marginBottom: 8,
    },
    bodyText: {
      fontSize: 9.5,
      lineHeight: 1.4,
      color: '#475569',
      textAlign: 'justify',
    },
    itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 3,
    },
    itemTitle: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#1E293B',
    },
    itemSubtitle: {
      fontSize: 9,
      fontStyle: 'italic',
      color: '#64748B',
    },
    itemDate: {
      fontSize: 8,
      fontWeight: 'semibold',
      color: '#64748B',
    },
    experienceDesc: {
      fontSize: 9,
      lineHeight: 1.4,
      color: '#475569',
      marginLeft: 8,
      borderLeftWidth: 1,
      borderLeftColor: '#E2E8F0',
      paddingLeft: 6,
      marginBottom: 8,
    },
    skillsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
    },
    skillBadge: {
      backgroundColor: '#F8FAFC',
      borderWidth: 0.5,
      borderColor: '#E2E8F0',
      borderRadius: 3,
      paddingHorizontal: 6,
      paddingVertical: 3,
      fontSize: 8.5,
      color: '#334155',
    },
    skillLevel: {
      fontSize: 7,
      color: '#64748B',
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Block */}
        <View style={styles.header}>
          <Text style={styles.title}>{name || 'Your Name'}</Text>
          <View style={styles.contactRow}>
            {email && <Text>Email: {email}</Text>}
            {phone && <Text>Phone: {phone}</Text>}
            {location && <Text>Location: {location}</Text>}
            {linkedin && <Text>LinkedIn: {linkedin}</Text>}
            {github && <Text>GitHub: {github}</Text>}
            {website && <Text>Website: {website}</Text>}
          </View>
        </View>

        {/* Summary */}
        {summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <View style={styles.sectionDivider} />
            <Text style={styles.bodyText}>{summary}</Text>
          </View>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            <View style={styles.sectionDivider} />
            {experience.map((exp, index) => (
              <View key={index} style={{ marginBottom: 8 }}>
                <View style={styles.itemHeader}>
                  <View style={{ flexDirection: 'row', gap: 4 }}>
                    <Text style={styles.itemTitle}>{exp.position || 'Position'}</Text>
                    <Text style={styles.itemSubtitle}>at {exp.company || 'Company'}</Text>
                  </View>
                  <Text style={styles.itemDate}>
                    {exp.startDate || 'Start'} – {exp.current ? 'Present' : exp.endDate || 'End'}
                  </Text>
                </View>
                {exp.description && (
                  <Text style={styles.experienceDesc}>{exp.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            <View style={styles.sectionDivider} />
            {projects.map((proj, index) => (
              <View key={index} style={{ marginBottom: 8 }}>
                <View style={styles.itemHeader}>
                  <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                    <Text style={styles.itemTitle}>{proj.name || 'Project Name'}</Text>
                    {proj.link && <Text style={{ fontSize: 7.5, color: '#2563EB' }}>({proj.link})</Text>}
                  </View>
                  {proj.technologies && (
                    <Text style={{ fontSize: 7.5, color: '#64748B', fontFamily: 'Courier' }}>
                      [{proj.technologies}]
                    </Text>
                  )}
                </View>
                {proj.description && (
                  <Text style={styles.experienceDesc}>{proj.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            <View style={styles.sectionDivider} />
            {education.map((edu, index) => (
              <View key={index} style={{ marginBottom: 6 }}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>
                    {edu.degree || 'Degree'}{edu.field ? ` in ${edu.field}` : ''}
                  </Text>
                  <Text style={styles.itemDate}>
                    {edu.startDate || 'Start'} – {edu.endDate || 'End'}
                  </Text>
                </View>
                <Text style={styles.itemSubtitle}>{edu.institution || 'Institution'}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.sectionDivider} />
            <View style={styles.skillsContainer}>
              {skills.map((skill, index) => (
                <View key={index} style={styles.skillBadge}>
                  <Text style={{ fontWeight: 'bold' }}>
                    {skill.name}{' '}
                    {skill.level && <Text style={styles.skillLevel}>({skill.level})</Text>}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}
